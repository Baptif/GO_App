package model

import (
	"gorm.io/gorm"
)

type Todo struct {
	gorm.Model
	Title string `json:"title" gorm:"type:varchar(100);not null"`
	Done  bool   `json:"done" gorm:"type:boolean;default:false"`
	Body  string `json:"body" gorm:"type:text;default:null"`
}
