class MessagesController < ApplicationController
  before_action :set_group

  def index
    @groups = current_user.groups.all
    @group = Group.find(params[:group_id])
    @message = Message.new
    @messages = @group.messages.includes(:user)

    respond_to do |format|
      format.html
      format.json { @newMessages = @messages.where('id > ?', params[:lastMessageId]) }
    end

  end

  def create
    @groups = current_user.groups
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group) }
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

end
