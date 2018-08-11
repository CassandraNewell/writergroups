class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:chat_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    puts data

    chat = Chat.find(id: params[:chat_id])
    binding.pry
    new_message = Message.create(
      body: data["message"],
      user: current_user
    )

    chat.messages << new_message

    binding.pry

    chat_key = chat.id

    chat_json = {
      "chat_key": chat_key,
      "message": data["message"],
      "user": data["user"]
    }

    ActionCable.server.broadcast("chat_#{params[:chat_id]}", chat_json)
  end
end
