package routes

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/abinashphulkonwar/golangcache/cachetypes"
	"github.com/abinashphulkonwar/golangcache/db"
	"github.com/gin-gonic/gin"
)

func RemoveCacheData(c *gin.Context) {

	bytes, err := ioutil.ReadAll(c.Request.Body)

	if err != nil {
		c.Error(err)
		return
	}

	dataRequest := cachetypes.BodyStruct{}
	json.Unmarshal(bytes, &dataRequest)

	if dataRequest.Id == "" {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"message": "cache id not found",
		})
		return
	}

	isValue := db.RemoveData(dataRequest.Id)

	if !isValue {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "cache not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
	})

}
