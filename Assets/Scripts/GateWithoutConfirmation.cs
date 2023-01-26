using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;


public class GateWithoutConfirmation : MonoBehaviour
{
    public string typeKey;
    public string toScene;

    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
    }

    private void OnTriggerEnter2D(Collider2D collider)
    {
        if (collider.gameObject.tag == "Player")
        {
            if (UIKeyController.uikc.removeKey(typeKey))
            {
                SceneManager.LoadScene(toScene);

                PlayerPrefs.SetInt("level", UIScoreController.uisc.level);
                PlayerPrefs.SetInt("score", UIScoreController.uisc.score);
            }
        }
    }

}
