class PagesController < ApplicationController

  before_action :require_user

  def home
    @posts = Post.all
  end

end