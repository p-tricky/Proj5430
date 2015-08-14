class GamesController < ApplicationController
  respond_to :json

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

end
