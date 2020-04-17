FactoryBot.define do
  factory :user do
    sequence :email do |n|
      "dummyEmail#{n}@gmail.com"
    end
    sequence :username do |n|
      "dummy_user_name#{n}"
    end
    password { "secretPassword" }
    password_confirmation { "secretPassword" }
  end

  factory :project do
    title {'project title'}
    description {'project description'}
    association :user
  end

  factory :contributor do
    username { "contributor username" }
    association :project
  end
end
