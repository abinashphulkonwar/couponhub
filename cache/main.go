package main

import (
	"fmt"

	db "github.com/abinashphulkonwar/golangcache/db"
	"github.com/abinashphulkonwar/golangcache/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	app := gin.Default()
	fmt.Println(db.Cache)
	app.Use(gin.Logger())
	app.Use(gin.Recovery())
	app.POST("/get-data", routes.GetCacheData)

	app.POST("/", routes.PostCacheData)

	app.DELETE("/", routes.RemoveCacheData)

	app.Run()
}
