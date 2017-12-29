#include <avr/sleep.h> #include <avr/power.h> 
#include <IRremote.h>
#include <U8glib.h>
#include <Adafruit_NeoPixel.h>//引用头文件 
#define PIN 6/*定义了控制LED的引脚，6表示Microduino的D6引脚，可通过Hub转接出来，用户可以更改 */ 
#define PIN_NUM 2 //定义允许接的led灯的个数

Adafruit_NeoPixel strip = Adafruit_NeoPixel(PIN_NUM, PIN, NEO_GRB + NEO_KHZ800);

int RECV_PIN = 10; IRrecv irrecv(RECV_PIN); decode_results results; int pin2 = 2;
long previousMillis = 0; // 存储LED最后一次的更新
long interval = 60000; // 闪烁的时间间隔（毫秒)
unsigned long currentMillis=0;
