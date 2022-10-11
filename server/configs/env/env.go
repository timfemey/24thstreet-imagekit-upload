package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func EnvURL() string {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	return os.Getenv("IMGKIT_URL")
}

func EnvPublicAPIKey() string {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	return os.Getenv("IMGKIT_PUBLIC_KEY")
}

func EnvPrivateAPISecret() string {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	return os.Getenv("IMGKIT_PRIVATE_KEY")
}

func EnvPort() string {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error Loading .env File")
	}
	val := os.Getenv("PORT")
	if val == "" {
		return ":6000"
	}
	return val
}

func EnvPIN() string {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error Loading .env File")
	}

	return os.Getenv("PIN")
}
