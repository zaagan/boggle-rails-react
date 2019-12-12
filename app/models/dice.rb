class Dice < ApplicationRecord

    def initialize(*args)
    #   super(*args)
      self.setup = self.generateLetterString(16)
    end
  
  
    def generateLetterString (matrix_size)
      letters = 'aaafrsaaeeeeaafirsadennnaeeeemaeegmuaegmnnafirsybjkqxzccenstceiiltceilptceipstddhnotdhhlordhlnordhlnoreiiittemotttensssufiprsygorrvwiprrrynootuwooottu'
      letters.split('').sample(matrix_size).join("")
    end
  
end