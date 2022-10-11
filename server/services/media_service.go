package services

import (
	helper "24thstreet-team-images-upload-server/helpers/uploadImg"
	model "24thstreet-team-images-upload-server/models"
	"bytes"
	"io"

	"github.com/go-playground/validator/v10"
)

var (
	validate = validator.New()
)

type mediaUpload interface {
	FileUpload(file model.File, fileName string) (string, string, string, error)
}

type media struct{}

func NewMediaUpload() mediaUpload {
	return &media{}
}

func (*media) FileUpload(file model.File, fileName string) (string, string, string, error) {
	//Validate
	err := validate.Struct(file)
	if err != nil {
		return "", "", "", err
	}

	//Check if Content is Inappropriate
	fileBuffer := bytes.NewBuffer(nil)
	_, err = io.Copy(fileBuffer, file.File)

	if err != nil {
		return "", "", "", err
	}

	//Upload
	r := bytes.NewReader(fileBuffer.Bytes())
	uploadFileId, uploadUrl, uploadThumbnailURL, err := helper.ImageUpload(r, fileName)
	if err != nil {
		return "", "", "", err
	}
	return uploadFileId, uploadUrl, uploadThumbnailURL, nil

}
