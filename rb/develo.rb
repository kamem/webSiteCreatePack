require "sass"

module Develo
    def isFile(fileName)
		path = fileName.value
		Sass::Script::String.new(FileTest.exist?(path).to_s)
    end

	def fileList(dir,isDir = true,extname = false)
		array = []
		dirs = Dir.glob(dir.value)
		dirs.each_with_index do |li,i|
			
			if isDir.to_s == "true" then
				file = li
			else
				if extname == false
					file = File.basename(li)
				else 
					file = File.basename(li,extname.value.to_s)
				end
			end
			
			array[i] = Sass::Script::String.new("#{file}")
		end
		Sass::Script::List.new(array,',')
	end
	
	def sqrt(x)
		numeric_transformation(x){|value| Math::sqrt(value)}
	end
end

module Sass::Script::Functions
    include Develo
end