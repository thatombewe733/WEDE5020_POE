/* Class data used by the dynamic timetable, the gallery and the enquiry response */
window.RESET_DATA = {
  prices: {
    mat:      { label: 'Mat Pilates',      single: 180, pack10: 1500 },
    reformer: { label: 'Reformer Pilates', single: 280, pack10: 2400 },
    private:  { label: 'Private Session',  single: 550, pack10: 4800 }
  },
  classes: [
    { id: 1, name: 'Sunrise Mat Flow',         type: 'mat',      branch: 'Rosebank', day: 'Monday',    time: '06:00', level: 'All levels',   spots: 6,  description: 'Wake up with breath-led core work and posture drills.' },
    { id: 2, name: 'Beginner Mat Foundations', type: 'mat',      branch: 'Midrand',  day: 'Tuesday',   time: '09:00', level: 'Beginner',     spots: 8,  description: 'Learn the core Pilates principles in a gentle, supportive class.' },
    { id: 3, name: 'Reformer Essentials',      type: 'reformer', branch: 'Rosebank', day: 'Wednesday', time: '17:30', level: 'Beginner',     spots: 3,  description: 'Meet the reformer: springs, straps and controlled resistance.' },
    { id: 4, name: 'Reformer Strength',        type: 'reformer', branch: 'Midrand',  day: 'Thursday',  time: '18:00', level: 'Intermediate', spots: 2,  description: 'Higher-tempo sequences to build full-body strength.' },
    { id: 5, name: 'Lunchtime Mat Reset',      type: 'mat',      branch: 'Rosebank', day: 'Friday',    time: '12:15', level: 'All levels',   spots: 10, description: 'A 45-minute stretch and strengthen break in your day.' },
    { id: 6, name: 'Saturday Reformer Flow',   type: 'reformer', branch: 'Rosebank', day: 'Saturday',  time: '08:00', level: 'All levels',   spots: 4,  description: 'Weekend flow focused on mobility and balance.' },
    { id: 7, name: 'One-on-One Coaching',      type: 'private',  branch: 'Midrand',  day: 'Monday',    time: '10:30', level: 'Tailored',     spots: 1,  description: 'A personal programme built around your goals.' },
    { id: 8, name: 'Post-Natal Mat',           type: 'mat',      branch: 'Midrand',  day: 'Saturday',  time: '09:30', level: 'Beginner',     spots: 5,  description: 'Gentle core-focused movement for new mothers.' }
  ],
  gallery: [
    { src: 'images/herophoto.png',  alt: 'Client practising on a reformer machine in the bright RESET studio' },
    { src: 'images/smallphoto.png', alt: 'Two wooden reformers surrounded by plants in the studio' },
    { src: 'images/largephoto.png', alt: 'Wall of Pilates rings, stability balls, resistance bars and hand weights' }
  ]
};
