package services

import (
	"fmt"
	"time"
)

func GetTime() int {

	currentTime := time.Now()

	fmt.Println(currentTime.Add(time.Duration(60 * 60 * 24)))
	fmt.Println(currentTime)

	return currentTime.Second() + (60 * 60 * 12)

}
