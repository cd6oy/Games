import random

lives = 3

for conter in range(1, 11):

    left = random.randrange(1,9);
    right = random.randrange(1,9);

    res = input( str(left) + 'x' + str(right) + '=');
    if( int(res) == left * right):
        print(res, ', correct!');
    else:
        print(res, ',Oops!');
# eqations = ['3x3=', '4x5=', '3x7', '9x9=', '10x10=', '7x7=', '8x8=']
#chalange = random(res)