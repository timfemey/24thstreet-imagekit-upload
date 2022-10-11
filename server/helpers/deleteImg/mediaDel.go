package delimg

import (
	config "24thstreet-team-images-upload-server/configs/env"
	"context"
	"time"

	ImageKit "github.com/imagekit-developer/imagekit-go"
)

func DelImg(fileId string) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	privateKey := config.EnvPrivateAPISecret()
	publicKey := config.EnvPublicAPIKey()
	urlEndpoint := config.EnvURL()

	//Initialize ImageKit Instance and Pass environment variables
	ik := ImageKit.NewFromParams(ImageKit.NewParams{
		PrivateKey:  privateKey,
		PublicKey:   publicKey,
		UrlEndpoint: urlEndpoint,
	})

	resp, err := ik.Media.DeleteFile(ctx, fileId)

	if err != nil {
		return false, err
	}
	if resp.StatusCode == 204 {
		return true, nil
	}
	return false, nil
}
