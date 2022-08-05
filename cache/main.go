package main

import (
	"io/ioutil"
	"log"
	"net/http"

	gojson "encoding/json"

	"github.com/gin-gonic/gin"
)

type data struct {
	data string
}

func main() {
	cache := make(map[string]data)
	cache["id"] = data{

		data: "hiiiii",
	}
	app := gin.Default()
	app.GET("/",

		func(c *gin.Context) {
			log.Println(cache["id"])
			c.JSON(http.StatusOK, gin.H{
				"message": "hiiiii",
			})

		})

	app.POST("/", func(c *gin.Context) {

		bytes, err := ioutil.ReadAll(c.Request.Body)
		if err != nil {
			panic(err)
		}
		dataSring := string(bytes[:])
		log.Println(dataSring)
		dataRequest := data{}
		gojson.Unmarshal([]byte(dataSring), &dataRequest)
		log.Println(dataRequest)
		c.JSON(http.StatusOK, gin.H{
			"message": "hiiiii",
		})

	})

	app.Run()
}
