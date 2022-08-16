package services

import (
	"testing"

	"fmt"
)

func TestGetTime(t *testing.T) {
	currentTime := GetTime()

	fmt.Println(currentTime)

	// if !currentTime {
	// 	t.Error("current time not correct")
	// }

}
