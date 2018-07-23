json.array! @newMessages.each do |message|
  json.name message.user.name
  json.id message.id
  json.body message.body
  json.image message.image.url
  json.created_at message.created_at.to_s(:default)
end
