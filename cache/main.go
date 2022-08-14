package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type chachData struct {
	Id   string `json:"id"`
	Data interface {
	} `json:"data"`
}
type bodyStruct struct {
	Id string `json:"id"`
}

func main() {
	cache := make(map[string]chachData)
	app := gin.Default()

	app.Use(gin.Logger())
	app.Use(gin.Recovery())
	app.GET("/",
		func(c *gin.Context) {

			bytes, err := ioutil.ReadAll(c.Request.Body)

			if err != nil {
				c.Error(err)
				return
			}

			dataRequest := bodyStruct{}
			json.Unmarshal(bytes, &dataRequest)

			if dataRequest.Id == "" {
				c.JSON(http.StatusUnprocessableEntity, gin.H{
					"message": "cache id not found",
				})
				return
			}

			response, isValue := cache[dataRequest.Id]

			if !isValue {
				c.JSON(http.StatusNotFound, gin.H{
					"message": "cache not found",
				})
				return
			}

			c.JSON(http.StatusOK, gin.H{
				"data": response,
			})

		})

	app.POST("/", func(c *gin.Context) {

		bytes, err := ioutil.ReadAll(c.Request.Body)
		if err != nil {
			c.Error(err)
			return
		}

		length := len(bytes) / 1000
		if length > 100 {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "large payload",
			})
			return
		}

		dataSring := string(bytes[:])

		dataRequest := chachData{}
		json.Unmarshal(bytes, &dataRequest)
		log.Println(dataSring)
		cache[dataRequest.Id] = dataRequest

		log.Println(cache)
		c.JSON(http.StatusOK, gin.H{
			"message": dataRequest,
		})

	})

	app.DELETE("/",
		func(c *gin.Context) {

			bytes, err := ioutil.ReadAll(c.Request.Body)

			if err != nil {
				c.Error(err)
				return
			}

			dataRequest := bodyStruct{}
			json.Unmarshal(bytes, &dataRequest)

			if dataRequest.Id == "" {
				c.JSON(http.StatusUnprocessableEntity, gin.H{
					"message": "cache id not found",
				})
				return
			}

			_, isValue := cache[dataRequest.Id]

			if !isValue {
				c.JSON(http.StatusNotFound, gin.H{
					"message": "cache not found",
				})
				return
			}
			delete(cache, dataRequest.Id)
			c.JSON(http.StatusOK, gin.H{
				"message": "success",
			})

		})

	app.Run()
}
