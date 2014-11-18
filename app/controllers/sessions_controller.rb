class SessionsController < ApplicationController

    def index
         @user = User.find(params[:user_id]) 
         @session = @user.sessions.find(params[:user_id])
         @tracks = Track.all
    end

    def new
        @user = User.find(params[:user_id]) 
        @session = @user.sessions.new 
        @tracks = Track.all
    end

    def create
        @user = User.find(params[:user_id]) 
        @session = @user.sessions.new sessions_params
        @tracks = Track.all 
                                                 
        if @session.save 
            flash[:notice] = "You have created a new session"
            redirect_to user_sessions_path(@user, @session)
        else
            flash[:error] = "You could not create a new session"
            render 'new'
        end
    end

    def edit
        @user = User.find(params[:user_id])
        @session = Session.find(params[:id])
        if @session == nil
            render 'sessions/index'
        end
    end

    def update
        @user = User.find(params[:user_id])
        @session = Session.find(params[:id])
        @tracks = Track.all
       
        
        if @session.update_attributes sessions_params
            redirect_to user_sessions_path
        else
            @errors = @session.errors.full_messages
            render 'edit'
        end
    end

    def destroy
        @session = Session.destroy(params[:id])
        redirect_to user_sessions_path(@user, @session)
    end

    private
    def sessions_params
        params.require(:session).permit(:session_name, :description, :user_id) 
    end 
end
