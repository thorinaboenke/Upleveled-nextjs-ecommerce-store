  <div
                      onClick={() => {
                        removeItemfromCartInCookie(item.id);
                      }}
                    >
                      Remove
                    </div>


<input
                  type="number"
                  min="1"
                  value={item.amount}
                  onChange={(e) =>{
                    updateAmountInCartInCookie(item.id, e.target.value); setCart(getCartFromCookies());}
                  }
                ></input>