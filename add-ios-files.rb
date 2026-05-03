#!/usr/bin/env ruby

# 这个脚本使用 xcodeproj gem 自动将原生文件添加到 Xcode 项目
# 安装: gem install xcodeproj

require 'xcodeproj'

# 项目路径
project_path = 'ios/MyAwesome.xcodeproj'
project = Xcodeproj::Project.open(project_path)

# 获取主 target
target = project.targets.first

# 获取 MyAwesome 组
myawesome_group = project.main_group.find_subpath('MyAwesome', true)

# 要添加的文件（使用相对于 MyAwesome 组的路径）
files_to_add = [
  { path: 'ios/MyAwesome/Calculator.h', name: 'Calculator.h' },
  { path: 'ios/MyAwesome/Calculator.mm', name: 'Calculator.mm' },
  { path: 'ios/MyAwesome/CustomButtonView.h', name: 'CustomButtonView.h' },
  { path: 'ios/MyAwesome/CustomButtonView.mm', name: 'CustomButtonView.mm' }
]

puts "📝 Adding files to Xcode project..."

files_to_add.each do |file_info|
  file_path = file_info[:path]
  file_name = file_info[:name]
  
  # 检查文件是否存在
  unless File.exist?(file_path)
    puts "❌ File not found: #{file_path}"
    next
  end
  
  # 检查文件是否已经在项目中
  existing_file = myawesome_group.files.find { |f| f.path == file_name }
  if existing_file
    puts "⏭️  File already exists: #{file_name}"
    # 移除旧的引用
    existing_file.remove_from_project
    puts "   Removed old reference"
  end
  
  # 添加文件引用（使用文件名，让 Xcode 在组目录中查找）
  file_ref = myawesome_group.new_reference(file_name)
  
  # 如果是 .mm 文件，添加到编译源
  if file_name.end_with?('.mm')
    target.source_build_phase.add_file_reference(file_ref)
    puts "✅ Added to compile sources: #{file_name}"
  else
    puts "✅ Added to project: #{file_name}"
  end
end

# 保存项目
project.save

puts ""
puts "🎉 Done! Files have been added to the Xcode project."
puts ""
puts "Next steps:"
puts "1. Open Xcode: open ios/MyAwesome.xcworkspace"
puts "2. Verify the files are in the project navigator"
puts "3. Clean build folder: Cmd+Shift+K"
puts "4. Build: Cmd+B"
puts "5. Run: pnpm ios"
