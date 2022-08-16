package services

import (
	"fmt"
	"time"
)

func GetTime() int64 {

	currentTime := time.Now()

	fmt.Println(currentTime)

	return currentTime.Unix()

}
