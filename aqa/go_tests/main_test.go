package main

import (
	"net/http"
	"testing"
)

func TestLogin(t *testing.T) {
	req, err := http.NewRequest("POST", "http://localhost:3001/login", nil)
	if err != nil {
		t.Fatal(err)
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		t.Fatal(err)
	}

	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status code 200, got %d", resp.StatusCode)
	}
}
