package routes

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/abinashphulkonwar/golangcache/cachetypes"
	"github.com/abinashphulkonwar/golangcache/db"
	"github.com/abinashphulkonwar/golangcache/services"
	"github.com/gin-gonic/gin"
)

func PostCacheData(c *gin.Context) {

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

	dataRequest := cachetypes.ChachData{}

	errJson := json.Unmarshal(bytes, &dataRequest)
	dataRequest.Time = services.GetTime()

	if errJson != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "unprocessable data",
		})
		return
	}

	db.SetData(dataRequest)

	c.JSON(http.StatusOK, gin.H{
		"message": dataRequest,
	})

}
