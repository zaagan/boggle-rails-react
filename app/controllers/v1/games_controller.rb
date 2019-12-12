class V1::GamesController < ApplicationController
  def index
    render json: { :game => [
             {
               :name => "Boggle v1.0",
               :message => "Welcome to Boggle !!",
               :id => "1",
             },

           ] }.to_json
  end

  # Get a new set of words based on the matrix size
  def new
    length = params[:length].to_i
    letters = "aaafrsaaeeeeaafirsadennnaeeeemaeegmuaegmnnafirsybjkqxzccenstceiiltceilptceipstddhnotdhhlordhlnordhlnoreiiittemotttensssufiprsygorrvwiprrrynootuwooottu"
    nextChunk = letters.split("").sample(length * length).join("")
    render json: nextChunk
  end

  # 1. Evaluate if the submitted word is correct or not
  # 2. Provide a score accordingly
  def evaluate
    word = params[:word]
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

    render json: {
      :is_correct => response,
      :score => score,
    }.to_json
  end

  # Cross check if the users word is in the dictionary or not
  def crosscheck
    word = params[:word]
    response = DICTIONARY.include?(word)
    render json: response
  end

  # Calculate score based on word length
  def scores
    word = params[:word]
    score = word.size - 2

    if score < 1
      score = 1
    end

    if score > 6
      score = 6
    end

    render json: score
  end
end
