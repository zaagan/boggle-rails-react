require "rails_helper"

describe "[Start a new game]", :type => :request do

  # Sample Response :
  # {
  #     "message": "New game initiated.",
  #     "success": true,
  #     "data": {
  #         "board_data": "idraoteroxhrqnsoceedntapb"
  #     }
  #  }

  # TEST CASE 1
  # Description : Correct input
  it "should provide a new random board data", :focus => true do
    length = 6
    get "/v1/games/new?length=" + length.to_s
    expect(response).to have_http_status(:ok)

    response_body = JSON.parse(response.body)
    expect(response_body["success"]).to eq(true)

    response_data = response_body["data"]
    expect(response_data["board_data"].length).to eq(length * length)
  end

  # TEST CASE 2
  # Description : Less characters
  it "should prompt the user to increase the length. Board data should not be provided.", :focus => true do
    length = 2
    get "/v1/games/new?length=" + length.to_s

    expect(response).to have_http_status(:bad_request)

    response_body = JSON.parse(response.body)
    expect(response_body["success"]).to eq(false)

    response_data = response_body["data"]
    expect(response_data).to eq(nil)
  end

  # TEST CASE 3
  # Description : Incorrect length
  it "should give an error if the length is invalid.", :focus => true do
    get "/v1/games/new?length=ttt"
    expect(response).to have_http_status(:bad_request)

    response_body = JSON.parse(response.body)
    expect(response_body["success"]).to eq(false)

    response_data = response_body["data"]
    expect(response_data).to eq(nil)
  end

  # TEST CASE 4
  # Description : Correct input, But too large
  it "maximum board size should be a 10 x 10 matrix", :focus => true do
    length = 11
    get "/v1/games/new?length=" + length.to_s
    expect(response).to have_http_status(:bad_request)

    response_body = JSON.parse(response.body)
    expect(response_body["success"]).to eq(false)

    response_data = response_body["data"]
    expect(response_data).to eq(nil)
  end

  # TEST CASE 5
  # Description : In correct input, User cannot submit empty length
  it "cannot allow empty submissions", :focus => true do
    get "/v1/games/new?length="
    expect(response).to have_http_status(:bad_request)

    response_body = JSON.parse(response.body)
    expect(response_body["success"]).to eq(false)

    response_data = response_body["data"]
    expect(response_data).to eq(nil)
  end

  # TEST CASE 6
  # Description : Parameter is required, Should not be able to invoke without a parameter
  it "should not allow requesting with empty parameters", :focus => true do
    get "/v1/games/new?length"
    expect(response).to have_http_status(:bad_request)

    response_body = JSON.parse(response.body)
    expect(response_body["success"]).to eq(false)

    response_data = response_body["data"]
    expect(response_data).to eq(nil)
  end
end
