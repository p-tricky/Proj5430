class StaticPagesController < ApplicationController
  def home
    if logged_in?
      @user = current_user
      redirect_to @user
    end
  end

  def about
  end

  def game
  end
end
