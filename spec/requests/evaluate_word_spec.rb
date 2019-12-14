require "rails_helper"

describe "[Evaluates words]", :type => :request do

  # Sample Response :
  # {
  #   "message":"Evaluation was succesfull !!",
  #   "success":true,
  #   "data":{"is_correct":true,"score":5}
  # }

  # TEST CASE 1
  # Description : Correct input
  it "validates a word and provides its score", :focus => true do
    get "/v1/games/evaluate?word=freedom"
    expect(response).to have_http_status(:ok)

    response_body = JSON.parse(response.body)
    expect(response_body["success"]).to eq(true)
    response_data = response_body["data"]

    expect(response_data["score"]).to eq(5)
    expect(response_data["is_correct"]).to eq(true)
  end

  # TEST CASE 2
  # Description : Less characters
  it "should mark the word as incorrect and provide no scores.", :focus => true do
    get "/v1/games/evaluate?word=ok"
    expect(response).to have_http_status(:bad_request)

    response_body = JSON.parse(response.body)
    expect(response_body["success"]).to eq(false)

    response_data = response_body["data"]
    expect(response_data).to eq(nil)
  end

  # TEST CASE 3
  # Description : Incorrect word
  it "should mark the word as incorrect and provide no scores.", :focus => true do
    get "/v1/games/evaluate?word=kkk"
    expect(response).to have_http_status(:ok)

    response_body = JSON.parse(response.body)
    expect(response_body["success"]).to eq(true)

    response_data = response_body["data"]
    expect(response_data["score"]).to eq(0)
    expect(response_data["is_correct"]).to eq(false)
  end

  # TEST CASE 4
  # Description : Correct input, Maximum score should be six
  it "maximum score should be 6", :focus => true do
    get "/v1/games/evaluate?word=hippopotamus"
    expect(response).to have_http_status(:ok)

    response_body = JSON.parse(response.body)
    expect(response_body["success"]).to eq(true)

    response_data = response_body["data"]
    expect(response_data["score"]).to eq(6)
    expect(response_data["is_correct"]).to eq(true)
  end

  # TEST CASE 5
  # Description : In correct input, User cannot submit empty words
  it "cannot allow empty submissions", :focus => true do
    get "/v1/games/evaluate?word="
    expect(response).to have_http_status(:bad_request)

    response_body = JSON.parse(response.body)
    expect(response_body["success"]).to eq(false)

    response_data = response_body["data"]
    expect(response_data).to eq(nil)
  end
  

  # TEST CASE 6
  # Description : Parameter is required, Should not be able to invoke without a parameter
  it "should not allow requesting with empty parameters", :focus => true do
    get "/v1/games/evaluate"
    expect(response).to have_http_status(:bad_request)

    response_body = JSON.parse(response.body)
    expect(response_body["success"]).to eq(false)

    response_data = response_body["data"]
    expect(response_data).to eq(nil)
  end
end
