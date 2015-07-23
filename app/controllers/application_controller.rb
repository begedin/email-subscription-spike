class ApplicationController < ActionController::API
  def index
    render :file => 'public/index.html'
  end

  def create
    begin
      gb = Gibbon::API.new(ENV["MAILCHIMP_API_KEY"])
      gb.lists.subscribe({id: ENV["MAILCHIMP_LIST_ID"], email: { email: email }, double_optin: false})
    rescue Gibbon::MailChimpError => e
      render json: e, status: 500
    end
  end

  def email
    puts params
    params[:data][:email]
  end
end
