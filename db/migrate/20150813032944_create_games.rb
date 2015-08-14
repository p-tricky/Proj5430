class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :score
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
    add_index :games, [:user_id, :score]
  end
end
