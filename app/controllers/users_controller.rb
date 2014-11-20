class UsersController < ApplicationController
    
    def index
    end

    def show                
        @user = User.find(params[:id])
        @session = @user.sessions.find(params[:id])
        @tracks = Track.all
    end
    
    private
    def sessions_params
        params.require(:session).permit(:session_name, :description, :user_id) 
    end 
end
