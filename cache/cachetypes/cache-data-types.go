package cachetypes

type ChachData struct {
	Id string `json:"id"`

	Data interface {
	} `json:"data"`
	Time int
}

type BodyStruct struct {
	Id string `json:"id"`
}
