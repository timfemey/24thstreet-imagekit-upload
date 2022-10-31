package showmed

import (
	config "24thstreet-team-images-upload-server/configs/env"
	"context"
	"time"

	ImageKit "github.com/imagekit-developer/imagekit-go"
	"github.com/imagekit-developer/imagekit-go/api/media"
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

func SeeImages() ([]media.File, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	resp, err := ik.Media.Files(ctx, media.FilesParam{
		Skip:  0,
		Limit: 50,
	})
	if err != nil {
		return nil, err
	}

	return resp.Data, nil
}
