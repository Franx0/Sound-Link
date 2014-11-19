# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user = User.create(user_name: 'Pablito', nickname:'gitmaster')
session = Session.create(session_name: 'JamSession', description: 'guitars, saxo and drums', user_id: user.id, from_date: Time.now)
track = Track.create(audio_file_name: 'Gold on the ceiling', session_id: session.id)
