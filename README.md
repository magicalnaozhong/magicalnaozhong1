# magicalnaozhong1
演示项目
#include <avr/sleep.h>
#include <avr/power.h>
#include <IRremote.h>
#include <U8glib.h>
#include <Adafruit_NeoPixel.h>//引用头文件
#define PIN 6   /*定义了控制LED的引脚，6表示Microduino的D6引脚，可通过Hub转接出来，用户可以更改 */
#define PIN_NUM 2 //定义允许接的led灯的个数

Adafruit_NeoPixel strip = Adafruit_NeoPixel(PIN_NUM, PIN, NEO_GRB + NEO_KHZ800);

int RECV_PIN = 10;
IRrecv irrecv(RECV_PIN);
decode_results results;
int pin2 = 2;
 
long previousMillis = 0;        // 存储LED最后一次的更新
long interval =  60000;           // 闪烁的时间间隔（毫秒）
unsigned long currentMillis=0; void pin2Interrupt(void) {
    /* 中断唤醒 */
 
    /*当中断引脚为低电平时关闭中断*/
    Serial.println("wake up!!!");
    detachInterrupt(1);
   while(1)
    {strip.setPixelColor(0, strip.Color(255, 0, 0));//红光
  strip.show();   //LED显示
  delay(1000);  //延迟1秒输出
  strip.setPixelColor(0, strip.Color(0, 255, 0));//绿光
  strip.show();  //LED显示
  delay(1000);  //延迟1秒输出
  strip.setPixelColor(0, strip.Color(0, 0, 255));//蓝光
  strip.show();  //LED显示
  delay(1000);  //延迟1秒输出
  strip.setPixelColor(0, strip.Color(0, 0, 0));//灭
  strip.show();  //LED显示
  delay(1000);  //延迟1秒输出
  /*循环以下：触摸苏醒60秒，亮灯红绿蓝（上），然后进入睡眠状态*/
  currentMillis = millis();
    Serial.print("Awake for ");
    Serial.print(currentMillis - previousMillis, DEC);
    Serial.println(" second");
    delay(1000);
     if (irrecv.decode(&results)) {
      Serial.println(results.value, HEX);

      irrecv.resume(); // 接收下一个值
      previousMillis = currentMillis;
    }

    if(currentMillis - previousMillis > interval) {
      previousMillis = currentMillis; 
      currentMillis = millis();
      Serial.println("Entering sleep");
      enterSleep();
    }
  if(currentMillis<previousMillis)
    previousMillis=currentMillis=0;
      }
}


 void enterSleep(void) {

    attachInterrupt(0, pin2Interrupt, HIGH);
    delay(100);
    set_sleep_mode(SLEEP_MODE_PWR_DOWN);
    sleep_enable();
    sleep_mode();
    sleep_disable(); 
    strip.setPixelColor(0, strip.Color(0, 0, 0));//灭
    strip.show();  //LED显示
    delay(1000);  //延迟1秒输出
}
void setup() {
    Serial.begin(9600);
    strip.begin();   //准备对灯珠进行数据发送
    /* Setup the pin direction. */
    pinMode(pin2, INPUT);
    irrecv.enableIRIn(); // 启动红外解码
    Serial.println("Initialisation complete.");
}
 
/***************************************************
 *  Name:        loop
 *  Returns:     Nothing.
 *  Parameters:  None.
 *  Description: Main application loop.
 ***************************************************/
void loop() {
  
    currentMillis = millis();
    Serial.print("Awake for ");
    Serial.print(currentMillis - previousMillis, DEC);
    Serial.println(" second");
    delay(1000);
     if (irrecv.decode(&results)) {
      Serial.println(results.value, HEX);

      irrecv.resume(); // 接收下一个值
      previousMillis = currentMillis;
    }

    if(currentMillis - previousMillis > 5000) {
      previousMillis = currentMillis; 
      currentMillis = millis();
      Serial.println("Entering sleep");
      enterSleep();
    }
  if(currentMillis<previousMillis)
    previousMillis=currentMillis=0;
}//开始时苏醒5秒，然后进入睡眠状态
