package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"strings"
)

// api/v1/coupon

type RoutesStaructs struct {
	auth   string
	create string
}

func main() {
	routes := RoutesStaructs{
		auth:   "/api/users",
		create: "api/v1/coupon",
	}

	director := func(request *http.Request) {

		log.Println(log.Ldate, request.URL.Path)

		if strings.Contains(request.URL.Path, routes.auth) {
			request.URL.Scheme = "http"
			request.URL.Host = "localhost:3000"

		} else if strings.Contains(request.URL.Path, routes.create) {
			request.URL.Scheme = "http"
			request.URL.Host = "localhost:3001"
		} else {
			request.URL.Scheme = "http"
			request.URL.Host = "localhost:3000"
		}

	}

	rp := &httputil.ReverseProxy{
		Director: director,
	}

	s := http.Server{
		Addr:    ":5000",
		Handler: rp,
	}

	if err := s.ListenAndServe(); err != nil {
		log.Fatal(err.Error())
	}
}
