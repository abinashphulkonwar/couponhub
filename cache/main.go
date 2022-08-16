package main

import (
	"fmt"

	db "github.com/abinashphulkonwar/golangcache/db"
	"github.com/abinashphulkonwar/golangcache/routes"
	"github.com/abinashphulkonwar/golangcache/scheduler"

	"github.com/gin-gonic/gin"
)

func main() {
	scheduler.CacheSchedler()
	app := gin.Default()
	app.SetTrustedProxies([]string{"localhost:5000"})
	fmt.Println(db.Cache)
	app.Use(gin.Logger())
	app.Use(gin.Recovery())
	app.POST("/get-data", routes.GetCacheData)

	app.POST("/", routes.PostCacheData)

	app.DELETE("/", routes.RemoveCacheData)

	app.Run()
}
