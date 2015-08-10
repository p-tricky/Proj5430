require 'spec_helper'

RSpec.describe User, type: :model do
  before do
    @user = User.new(name: "Zach Dodds", email: "zdodds@coolestdudever.com", 
                     password: "spam!!!", password_confirmation: "spam!!!")
  end

  subject { @user }
  it { should respond_to(:name) }
  it { should respond_to(:email) }
  it { should respond_to(:password_digest) }
  it { should respond_to(:password) }
  it { should respond_to(:password_confirmation) }
  it { should be_valid }

  describe "when password is not present" do
    before { @user.password = @user.password_confirmation = " " }
    it { should_not be_valid }
  end

end
