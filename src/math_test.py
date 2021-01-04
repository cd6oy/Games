import random

lives = 3
score = 0

heart_symbol = u'♥'

for conter in range(1, 11):
    print(heart_symbol * lives)
    left = random.randrange(1,9);
    right = random.randrange(1,9);

    res = input( str(left) + 'x' + str(right) + '=');
    if( int(res) == left * right):
        print(res, 'is correct!');
        score = score + 1;
    else:
        print(res, 'is incorrect!');
        lives = lives - 1
        if (lives == 0):
            break


if(lives == 0):
    print('You are out of lives! You lose!')
else:
    print('Congratulations! You finished! Your score is ' + str(score) + '/10');

# eqations = ['3x3=', '4x5=', '3x7', '9x9=', '10x10=', '7x7=', '8x8=']
#chalange = random(res)
