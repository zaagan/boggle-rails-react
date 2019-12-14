# The response payloa
class Response
   attr_accessor :message, :success, :data 

   def initialize(message, success, data)
      self.message = message
      self.success = success
      self.data = data
   end
end