package helper

import (
	config "24thstreet-team-images-upload-server/configs/env"
	"context"
	"time"

	ImageKit "github.com/imagekit-developer/imagekit-go"
	"github.com/imagekit-developer/imagekit-go/api/uploader"
)

var privateKey = config.EnvPrivateAPISecret()
var publicKey = config.EnvPublicAPIKey()
var urlEndpoint = config.EnvURL()

// Initialize ImageKit Instance and Pass environment variables
var ik = ImageKit.NewFromParams(ImageKit.NewParams{
	PrivateKey:  privateKey,
	PublicKey:   publicKey,
	UrlEndpoint: urlEndpoint,
})

func ImageUpload(input interface{}, fileName string) (string, string, string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	upload, err := ik.Uploader.Upload(ctx, input, uploader.UploadParam{
		FileName: fileName,
	})
	if err != nil {
		return "", "", "", err
	}

	return upload.Data.FileId, upload.Data.Url, upload.Data.ThumbnailUrl, nil
}
