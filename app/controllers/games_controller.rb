class GamesController < ApplicationController
  respond_to :json

  def show
    @games = Game.order(score: :desc)
  end

  def create
    player = current_user
    @game = Game.new(:user_id => player[:id], :score => params["score"])
    if @game.save
      if not player[:highgame_id]
        player.update_attribute(:highgame_id, @game[:id])
      elsif player.highgame[:score] < @game[:score]
        player.update_attribute(:highgame_id, @game[:id])
      end
      respond_with(@game)  
    else
      respond_to do |format|
        format.json { head :error }
      end 
    end
  end

  def filter
    startDate = Date.new(*params[:start].values.map(&:to_i))
    endDate = Date.new(*params[:end].values.map(&:to_i))
    @games = Game.joins(:user).where("name like ?", "%#{params[:name]}%").where(
      :created_at => startDate..endDate).where(
        :score => params[:min_score].to_i..params[:max_score].to_i)
    render 'games/show'
  end

end
