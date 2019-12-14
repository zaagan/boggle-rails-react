class V1::GamesController < ApplicationController
  helper_method :is_number?

  # Get a short intro about the game
  def index
    message = MSG_WELCOME
    success = true
    data = {
      :name => MSG_GAME_VER,
    }
    response_data = Response.new(message, success, data)

    render json: response_data, status: STATUS_OK
  end

  # Start a new game
  # Url: /v1/games/new
  # Description: Get a new set of words based on the provided matrix size
  def new
    length = params[:length]
    status = STATUS_OK
    can_proceed = true
    error_msg = ""
    response_data = nil

    # CHECK IF THE PARAMETER IS PROVIDED
    if !params.has_key?(:length) || length.nil?
      error_msg = MSG_LENGTH_NOT_PROVIDED
      can_proceed = false
      status = STATUS_BAD_REQUEST  # Bad request
    end

    # CHECK IF THE PARAMETER IS AN ACCEPTABLE NUMBER
    if can_proceed && (!is_number?(length) || length.to_i < MIN_WORD_LENGTH || length.to_i > MAX_WORD_LENGTH)
      error_msg = MSG_BOARD_LENGTH_INVALID
      can_proceed = false
      status = STATUS_BAD_REQUEST # Bad request
    end

    if can_proceed
      length = length.to_i

      nextChunk = BOGGLE_STRING.split("").sample(length * length).join("")

      message = MSG_GAME_INITIATED
      success = true
      data = {
        :board_data => nextChunk,
      }
      response_data = Response.new(message, success, data)
    else
      response_data = Response.new(error_msg, false, nil)
    end

    render json: response_data, status: status
  end

  # Evalues a word
  # Url: /v1/games/evaluate
  # Description:
  # 1. Evaluate if the submitted word is correct or not
  # 2. Provide a score accordingly
  def evaluate
    word = params[:word]
    status = STATUS_OK
    can_proceed = true
    error_msg = ""
    response_data = nil

    if !params.has_key?(:word) || word.nil?
      error_msg = MSG_EVALUATION_WORD_EMPTY
      can_proceed = false
      status = STATUS_BAD_REQUEST  # Bad request
    end

    if can_proceed and word.length < MIN_WORD_LENGTH
      error_msg = MSG_LENGTH_TOO_SMALL
      can_proceed = false
      status = STATUS_BAD_REQUEST # Bad request
    end

    if can_proceed
      # Evaluate the word with a score

      response = DICTIONARY.include?(word)

      score = 0
      if response == true
        score = word.size - 2

        if score < 1
          score = 1
        end

        if score > 6
          score = 6
        end
      end

      message = MSG_EVALUATION_SUCCESS
      success = true
      data = {
        :is_correct => response,
        :score => score,
      }

      response_data = Response.new(message, success, data)
    else
      response_data = Response.new(error_msg, false, nil)
    end

    render json: response_data, status: status
  end

  #######################################
  # HELPER METHODS
  #######################################

  def is_number?(string)
    true if Float(string) rescue false
  end
end
