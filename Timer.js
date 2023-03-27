class Timer {

    // *** Future Improves ***
    // - in future this method recive a optional array of strings that is name of timers and he bring only the Timers of this query
    // - in future need be a array to process Timer execution, to dont have failure by if 2 timers run in same time, so exist a row array that run 1 timer method de cada vez
    
    
    static GetTimers(){
        let TimersArray = [{TimerName : '123',StartTime : 123}]
        TimersArray.splice(0,1)

        if(process.env.Timers){
            TimersArray = JSON.parse(process.env.Timers)
        } else {
            process.env.Timers = JSON.stringify([])
        }
        return TimersArray
    }

    static GetTimer(timer_name){
        let ReturnTimer = {TimerName : '123',StartTime : 123,RunningTime : 123}
        delete ReturnTimer.StartTime
        delete ReturnTimer.TimerName
        let timers = Timer.GetTimers()
        if(timers.findIndex(e => e.TimerName == timer_name) != -1){
            ReturnTimer.TimerName = timers[timers.findIndex(e => e.TimerName == timer_name)].TimerName
            ReturnTimer.StartTime = timers[timers.findIndex(e => e.TimerName == timer_name)].StartTime
            ReturnTimer.RunningTime = (performance.now()-ReturnTimer.StartTime).toFixed(2)
        }

        if(ReturnTimer.TimerName && ReturnTimer.StartTime){
            return ReturnTimer
        } else {
            return null
        }
        
    }

    static Start(timer_name){

        let TimersArray = [{TimerName : '123',StartTime : 123}]
        TimersArray.splice(0,1)

        if(process.env.Timers){
            TimersArray = JSON.parse(process.env.Timers)
        } else {
            process.env.Timers = JSON.stringify([])
        }


        if(TimersArray.findIndex((e) => e.TimerName == timer_name) != -1){
            TimersArray.splice(TimersArray.findIndex((e) => e.TimerName == timer_name),1)
            TimersArray.push({
                TimerName : timer_name ? timer_name : '',
                StartTime : performance.now()
            })
        } else {
            TimersArray.push({
                TimerName : timer_name ? timer_name : '',
                StartTime : performance.now()
            })
        }
    
        // here is the number of max unique Timers into array of Timers
       let MaxInstances = 1000 

       while(TimersArray.length > MaxInstances){
            TimersArray.splice(0,1)
        }
        
    process.env.Timers = JSON.stringify(TimersArray)
    
    return TimersArray[TimersArray.findIndex((e) => e.TimerName == timer_name)]
    }

static Finish(timer_name,decimal_count = 2){
    let execution_time = 0
    let endTime = performance.now()
    let AllTimers = Timer.GetTimers()
    if(AllTimers.findIndex((e) => e.TimerName == timer_name) != -1){
     execution_time = (endTime-AllTimers[AllTimers.findIndex((e) => e.TimerName == timer_name)].StartTime)   
     AllTimers.splice(AllTimers.findIndex((e) => e.TimerName == timer_name),1)
    }
    process.env.Timers = JSON.stringify(AllTimers)
    return parseInt(execution_time.toFixed(decimal_count))
}

static StartLog(timer_name){
    console.log('Starting execution of '+ timer_name + '...')
    return Timer.Start(timer_name)
}

static FinishLog(timer_name,decimal_count){
    let finishtime = Timer.Finish(timer_name,decimal_count)
    console.log(`${timer_name} completed !! | Time : ${finishtime} ms`)
    return finishtime
}

}

export default Timer