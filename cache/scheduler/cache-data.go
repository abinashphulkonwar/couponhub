package scheduler

import (
	"fmt"
	"time"

	"github.com/abinashphulkonwar/golangcache/db"
	"github.com/jasonlvhit/gocron"
)

func task() {
	fmt.Println("I am running task.")
	currentTime := time.Now()

	for val, data := range db.Cache {

		if data.Time < currentTime.Unix() {
			fmt.Println(val, data)
			db.RemoveData(val)

		}
	}
}

func CacheSchedler() {

	gocron.Every(30).Minute().Do(task)

	gocron.Start()
}
