package services

import (
	"testing"

	"fmt"
)

func TestGetTime(t *testing.T) {
	currentTime := GetTime()

	fmt.Println(currentTime)

	if currentTime < 0 {
		t.Error("current time not correct")
	}

}
