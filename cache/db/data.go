package db

import (
	"github.com/abinashphulkonwar/golangcache/cachetypes"
)

var Cache = make(map[string]cachetypes.ChachData)

func SetData(data cachetypes.ChachData) {
	Cache[data.Id] = data
}
func GetData(id string) (cachetypes.ChachData, bool) {
	response, isValue := Cache[id]

	return response, isValue
}
func RemoveData(id string) bool {
	_, isValue := Cache[id]
	if isValue {
		delete(Cache, id)
		return isValue
	} else {
		return isValue
	}
}
