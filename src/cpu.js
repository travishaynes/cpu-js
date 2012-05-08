CPU = (function() {

  // constructor
  function CPU() {}
  
  
  // the call _stack
  CPU.prototype._stack = [];
  
  
  // how many milliseconds between each tick
  CPU.prototype.throttle = 1;
  
  
  // find the index of a job on the stack
  CPU.prototype.indexOf = function(job) {
    return this._stack.indexOf(job);
  };
  
  
  // register a new function on the stack
  // @param [Integer] interval The ticks before the function will be called
  // @param [Integer] cycles The amount of cycles to execute this function. 0 is infinite
  CPU.prototype.register = function(func, interval, cycles) {
    return this._stack.push({
        func      : func
      , interval  : interval
      , cycles    : cycles
      , cycle     : 0
      , tick      : 0
    });
  };
  
  
  // remove a function from the stack
  CPU.prototype.unregister = function(index) {
    return this._stack.pop(index);
  };
  
  
  // start the CPU
  CPU.prototype.start = function(){
    var cpu = this;
    
    this._handle = setInterval(
      
      function(){
        
        for(i in cpu._stack){
          
          if(++cpu._stack[i].tick>=cpu._stack[i].interval){
            
            if(cpu._stack[i].cycles>0 && ++cpu._stack[i].cycle>cpu._stack[i].cycles) {
              cpu.unregister(i);
            } else {
              cpu._stack[i].tick = 0;
              
              setTimeout(cpu._stack[i].func,0);
            }
          
          }
        
        }
      
      }
      , this.throttle
    );
  };
  
  
  // shutdown the CPU
  CPU.prototype.stop = function(){
    if(this._handle){
      clearInterval(this._handle);
      this._handle = null;
    }
  };
  
  
  // restart the CPU
  CPU.prototype.reboot = function(){
    this.stop();
    this.start();
  };
  
  
  return CPU;
})();
