class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    puts data

    # create new message in backend
    group = Group.find_by(id: params[:id])
    new_message = Message.create({
      body: data["message"],
      user: current_user,
      group: group
    })

    group.messages << new_message

    # binding.pry

    # send to frontend
    chat_json = {
      "chat_key": params[:id],
      "message": MessageSerializer.new(new_message),
      "user": current_user
    }

    ActionCable.server.broadcast("chat_#{params[:id]}", chat_json)
  end
end
