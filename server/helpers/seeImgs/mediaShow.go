package showmed

import (
	config "24thstreet-team-images-upload-server/configs/env"
	"context"
	"time"

	ImageKit "github.com/imagekit-developer/imagekit-go"
	"github.com/imagekit-developer/imagekit-go/api/media"
)

func SeeImages() ([]media.File, error) {
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

	resp, err := ik.Media.Files(ctx, media.FilesParam{
		Skip:        0,
		Limit:       15,
		SearchQuery: "createdAt >= \"7d\" AND size < \"4mb\"",
	})
	if err != nil {
		return nil, err
	}

	return resp.Data, nil
}
