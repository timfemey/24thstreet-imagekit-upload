package controller

import (
	config "24thstreet-team-images-upload-server/configs/env"
	"24thstreet-team-images-upload-server/dto"
	delimg "24thstreet-team-images-upload-server/helpers/deleteImg"
	showmed "24thstreet-team-images-upload-server/helpers/seeImgs"
	model "24thstreet-team-images-upload-server/models"
	"24thstreet-team-images-upload-server/services"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

func FileUpload(c *fiber.Ctx) error {
	form, err := c.MultipartForm()

	if err != nil {
		return err
	}
	name := form.Value["name"][0]
	pin := form.Value["pin"][0]
	if pin != config.EnvPIN() {
		return c.Status(http.StatusForbidden).JSON(
			dto.MediaDto{
				StatusCode: http.StatusForbidden,
				Message:    "Invalid PIN",
				Status:     false,
				Data:       &fiber.Map{"data": "Invalid PIN Received"},
			})
	}

	formHeader := form.File["file"]
	if err != nil {
		return err
	}
	var sizeLimit int = 4 * 1024 * 1024
	var formLen = len(formHeader)
	if formLen == 0 {
		return c.Status(http.StatusNoContent).JSON(
			dto.MediaDto{
				StatusCode: http.StatusNoContent,
				Message:    "No File Received",
				Status:     false,
				Data:       &fiber.Map{"data": "No File Was Sent to Server"},
			})
	}
	if formLen > 1 {
		return c.Status(http.StatusForbidden).JSON(
			dto.MediaDto{
				StatusCode: http.StatusForbidden,
				Message:    "Only One Images Allowed Per Request",
				Status:     false,
				Data:       &fiber.Map{"data": "One Images Allowed"},
			})
	}
	var fileDetails []map[string]any

	for i := 0; i < formLen; i++ {
		//Check Size of File
		if formHeader[i].Size > int64(sizeLimit) {
			return c.Status(http.DefaultMaxHeaderBytes).JSON(
				dto.MediaDto{
					StatusCode: http.DefaultMaxHeaderBytes,
					Message:    "File is too Big, Keep it Under 3MB",
					Status:     false,
					Data:       &fiber.Map{"data": "Image is too big"},
				})
		}

		//Check Content Type
		h := formHeader[i].Header
		content := h.Get("Content-Type")
		if content != "image/png" && content != "image/jpeg" && content != "image/svg" && content != "image/webp" && content != "image/jpg" {
			return c.Status(http.StatusForbidden).JSON(
				dto.MediaDto{
					StatusCode: http.StatusBadRequest,
					Message:    "Unsupported Image Format",
					Status:     false,
					Data:       &fiber.Map{"data": "Image Format is Not Supported"},
				})
		}

		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(
				dto.MediaDto{
					StatusCode: http.StatusInternalServerError,
					Message:    "Error occured Getting File Form",
					Status:     false,
					Data:       &fiber.Map{"data": "Select a file to upload"},
				})

		}

		//get file from header
		formFile, err := formHeader[i].Open()
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(
				dto.MediaDto{
					StatusCode: http.StatusInternalServerError,
					Message:    "Error",
					Status:     false,
					Data:       &fiber.Map{"data": err.Error()},
				})
		}
		fileId, url, thumbnailURL, err := services.NewMediaUpload().FileUpload(model.File{File: formFile}, name)
		tempSlice := map[string]any{"fileId": fileId, "url": url, "thumbnail": thumbnailURL}
		fileDetails = append(fileDetails, tempSlice)
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(
				dto.MediaDto{
					StatusCode: http.StatusInternalServerError,
					Message:    "Error Uploading File",
					Status:     false,
					Data:       &fiber.Map{"data": err.Error()},
				})
		}

	}

	return c.Status(http.StatusOK).JSON(
		dto.MediaDto{
			StatusCode: http.StatusOK,
			Message:    "success",
			Status:     true,
			Data:       &fiber.Map{"data": fileDetails},
		})

}

func DeleteFile(c *fiber.Ctx) error {
	givenPin := c.Query("pin")
	givenFileId := c.Query("file_id")
	if givenFileId == "" {
		return c.Status(http.StatusNotFound).JSON(
			dto.MediaDto{
				StatusCode: http.StatusNotFound,
				Message:    "File ID was not received",
				Status:     false,
				Data:       &fiber.Map{"data": "File ID was not received"},
			})
	}
	if givenPin != config.EnvPIN() {
		return c.Status(http.StatusForbidden).JSON(
			dto.MediaDto{
				StatusCode: http.StatusForbidden,
				Message:    "Invalid PIN",
				Status:     false,
				Data:       &fiber.Map{"data": "Invalid PIN Received"},
			})
	}
	sit, err := delimg.DelImg(givenFileId)
	if err != nil {
		return err
	}
	if sit == true {
		return c.Status(http.StatusOK).JSON(
			dto.MediaDto{
				StatusCode: http.StatusOK,
				Message:    "success",
				Status:     true,
			})
	} else {
		return c.Status(http.StatusNotImplemented).JSON(
			dto.MediaDto{
				StatusCode: http.StatusNotImplemented,
				Message:    "Failed",
				Status:     false,
			})
	}

}

func GetFiles(c *fiber.Ctx) error {
	reponse, err := showmed.SeeImages()
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(
			dto.MediaDto{
				StatusCode: http.StatusInternalServerError,
				Message:    "Error Getting Images",
				Status:     false,
				Data:       &fiber.Map{"data": err.Error()},
			})
	}
	return c.Status(http.StatusOK).JSON(
		dto.MediaDto{
			StatusCode: http.StatusOK,
			Message:    "success",
			Status:     true,
			Data:       &fiber.Map{"data": reponse},
		})

}
